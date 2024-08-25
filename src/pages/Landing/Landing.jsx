import React, {useEffect, useRef, useState} from "react";

import LandingThumbnail from '../../images/landing-video-thumbnail-ph.png';
import Modal from "../../components/Modal/Modal";
import {Link} from "react-router-dom";

export const LandingPage = () => {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const video = useRef(null);

    useEffect(() => {
        videoModalOpen ? video.current.play() : video.current.pause();
    }, [videoModalOpen]);

    return (
        <section className="max-h-screen overflow-hidden">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-12 pb-12 md:pt-12 md:pb-20">
                    <div className="text-center tracking-wider pb-6">
                        <h1 className="text-7xl font-extrabold mb-4" data-aos="zoom-y-out">
                            Keep your sense with <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-900 to-emerald-400">Whatcents</span>
                        </h1>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl italic font-extrabold text-gray-400 mb-2" data-aos="zoom-y-out" data-aos-delay="150">
                                No more wasted time on figuring out how much money you have left after monthly expenses.
                            </p>
                            <p className="text-xl text-gray-400 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                                It's simple, after adding all of your monthly expenses, add your average paycheck income and Whatcents will tell you how much you have left!
                            </p>
                            <div className="gap-4 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                                <Link to="/login">
                                    <div className="px-6 py-3 btn rounded-sm bg-emerald-950 text-center text-white outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 hover:outline-emerald-600 active:bg-emerald-800 w-full mb-4">
                                        Login
                                    </div>
                                </Link>

                                <Link to="/login">
                                    <div className="px-6 py-3 btn rounded-sm bg-gray-850 text-center text-white outline outline-1 outline-offset-0 outline-gray-700 hover:bg-gray-800 hover:outline-gray-600 active:bg-gray-800 w-full">
                                        Sign up
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
                            <div className="flex flex-col justify-center">
                                <img className="mx-auto" src={LandingThumbnail} width="768" height="432" alt="Hero" />
                            </div>
                            <button
                                className="absolute top-full flex items-center transform -translate-y-1/2 bg-emerald-950 rounded-full font-medium group outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 p-4 shadow-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setVideoModalOpen(true);
                                }}
                                aria-controls="modal"
                            >
                                <svg
                                    className="w-6 h-6 fill-current text-gray-400 group-hover:text-emerald-500 flex-shrink-0"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                                    <path d="M10 17l6-5-6-5z" />
                                </svg>
                                <span className="ml-3">Watch the full video (2 min)</span>
                            </button>
                        </div>

                        <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
                            <div className="relative pb-9/16">
                                <video ref={video} className="absolute w-full h-full" width="1920" height="1080" loop autoPlay controls>
                                    <source src="/videos/video.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </section>
    );
}