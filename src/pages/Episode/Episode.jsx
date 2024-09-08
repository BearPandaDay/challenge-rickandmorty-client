import { useEffect, useState } from 'react';
import { Apiepisode } from '../../api';

import './Episode.scss';
import { Button, Modal } from 'antd';

export function Episode() {
    const apiepisodeController = new Apiepisode();

    const [dataLocations, setDataLocations] = useState([]);
    const [info, setInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [characterNames, setCharacterNames] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    
    useEffect(() => {
        getEpisode(currentPage);
    }, [currentPage])

    async function getEpisode(page)  {
        const response = await apiepisodeController.getEpisode(page);
        if (response) {
            setDataLocations(response.results);
            setInfo(response.info);
        }
    }

    const getCharacterNames = async (characterUrls) => {
        const characterPromises = characterUrls.map(url => fetch(url).then(res => res.json()));
        const characters = await Promise.all(characterPromises);
        return characters.map(character => character.name);
    };

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

    const showModal = async (location) => {
        setSelectedEpisode(location);
        if (location.characters && location.characters.length > 0) {
            const names = await getCharacterNames(location.characters);
            setCharacterNames(names);
        } else {
            setCharacterNames([]);
        }
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div className='content-children-main-location'>
        <div className='content-title'>
            <h1>EXERCISE RICK AND MORTY</h1>
        </div>
        <div className="content-children">
            {dataLocations.map((data, index) => (
                <div className="target" key={index}>
                    <div className='content-image'>
                        <img src={data?.image} alt="" />
                    </div>
                    <div className="content-data-text">
                        <label htmlFor="name">Name: {(data?.name && data?.name !== 'unknown' ) ? (data?.name) : ("")}</label>
                        <label htmlFor="name">Air date: {(data?.air_date && data?.air_date !== 'unknown' ) ? (data?.air_date) : ("")}</label>
                        <label htmlFor="name">Episode: {(data?.episode && data?.episode !== 'unknown' ) ? (data?.episode) : ("")}</label>
                    </div>
                    <div className='content-footer-buttons'>
                        <Button type="default" onClick={() => showModal(data)}>Characters</Button>
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


        <Modal title={`Residents of ${selectedEpisode?.name}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h3>Characters:</h3>
            <ul>
                {characterNames.length > 0 ? (
                    characterNames.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))
                ) : (
                    <p>No characters found</p>
                )}
            </ul>
        </Modal>
        </div>
    )
}
