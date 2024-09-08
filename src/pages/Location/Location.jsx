import { useEffect, useState } from 'react';
import { Apilocations } from '../../api';

import './Location.scss';
import { Button, Modal } from 'antd';

export function Location() {
    const apilocationsController = new Apilocations();

    const [dataLocations, setDataLocations] = useState([]);
    const [info, setInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [residentNames, setResidentNames] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
//
    useEffect(() => {
        getLocations(currentPage);
    }, [currentPage])

    async function getLocations(page)  {
        const response = await apilocationsController.getLocations(page);
        if (response) {
            setDataLocations(response.results);
            setInfo(response.info);
        }
    }
//
    const getCharacterNames = async (characterUrls) => {
        const characterPromises = characterUrls.map(url => fetch(url).then(res => res.json()));
        const characters = await Promise.all(characterPromises);
        return characters.map(character => character.name);
    };
//
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
//
    const showModal = async (location) => {
        setSelectedLocation(location);
        if (location.residents && location.residents.length > 0) {
            const names = await getCharacterNames(location.residents);
            setResidentNames(names);
        } else {
            setResidentNames([]);
        }
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
//
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
                        <label htmlFor="name">Type: {(data?.type && data?.type !== 'unknown' ) ? (data?.type) : ("")}</label>
                        <label htmlFor="name">Dimension: {(data?.dimension && data?.dimension !== 'unknown' ) ? (data?.dimension) : ("")}</label>
                    </div>
                    <div className='content-footer-buttons'>
                        <Button type="default" onClick={() => showModal(data)}>Residents</Button>
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


        <Modal title={`Residents of ${selectedLocation?.name}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h3>Residents:</h3>
            <ul>
                {residentNames.length > 0 ? (
                    residentNames.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))
                ) : (
                    <p>No residents found</p>
                )}
            </ul>
        </Modal>
        </div>
    )
}
