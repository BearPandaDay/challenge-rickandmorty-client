import { useEffect, useState } from 'react';
import { Apicharacters } from '../../api';

import './Characters.scss';

export function Characters() {
    const apicharactersController = new Apicharacters();

    const [dataCharacters, setDataCharacters] = useState([]);
    const [info, setInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        getCharacters(currentPage);
    }, [currentPage])

    async function getCharacters(page)  {
        const response = await apicharactersController.getCharacters(page);
        if (response) {
            setDataCharacters(response.results);
            setInfo(response.info);
        }
    }
    
    
    const goToPrevPage = () => {
        if (info.prev) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (info.next) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    return (
        <div className='content-children-main'>
        <div className='content-title'>
            <h1>EXERCISE RICK AND MORTY</h1>
        </div>
        <div className="content-children">
            {dataCharacters.map((data, index) => (
                <div className="target" key={index}>
                    <div className='content-image'>
                        <img src={data?.image} alt="" />
                    </div>
                    <div className="content-data-text">
                        <label htmlFor="name">Name: {(data?.name && data?.name !== 'unknown' ) ? (data?.name) : ("")}</label>
                        <label htmlFor="name">Status: {(data?.status && data?.status !== 'unknown' ) ? (data?.status) : ("")}</label>
                        <label htmlFor="name">Species: {(data?.species && data?.species !== 'unknown' ) ? (data?.species) : ("")}</label>
                        <label htmlFor="name">Type: {(data?.type && data?.type !== 'unknown' ) ? (data?.type) : ("")}</label>
                        <label htmlFor="name">Gender: {(data?.gender && data?.gender !== 'unknown' ) ? (data?.gender) : ("")}</label>
                    </div>
                </div>
            ))}
        </div>
        <div className="pagination-controls">
            <button onClick={goToPrevPage} disabled={!info.prev}>
                Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={goToNextPage} disabled={!info.next}>
                Next
            </button>
        </div>
        </div>
    )
}
