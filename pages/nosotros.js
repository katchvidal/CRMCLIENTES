import React from 'react'
import Layout from '../components/Layout'

const Nosotros = () => {
    return (


    <Layout>
            <div className="bg-white block py-10 mt-5">
                <div className="max-w-2xl mx-auto">

                    <div className="w-full">
                        <div className="w-full bg-blue-600 h-48 rounded-t-lg"></div>
                        <div className="absolute -mt-20 ml-5">
                            <div className="bg-gray-200 border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary"></div>
                        </div>
                    </div>


                    <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
                        <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-40"><h1> Kath Vidal </h1></div>
                        <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-96"><h1> Full Stack Developer / Backend Developer  </h1></div>
                        <div className="text-sm mt-2 text-gray-200">
                            <div className="flex flex-row ml-auto space-x-2 items-center">
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20">  </div>

                                <div className="bg-blue-200 rounded-full h-1 w-1"></div>
 
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>

                            </div>
                        </div>

                        <div className="pt-8 flex gap-8">
                            <div className="flex flex-col">
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"> </div>
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"> </div>
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                                <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                            </div>
                        </div>
                        <div className="py-5 break-all bbcode">
                            <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
                            <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
                        </div>
                    </div>
                </div>
            </div>
    </Layout>

    )
}

export default Nosotros
