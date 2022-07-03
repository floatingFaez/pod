import { useState } from 'react'

const Tabs = () => {
    const [activeTab,setActiveTab] = useState(1)


    return ( 
        <>
        
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px justify-around text-sm font-medium text-center border-b">
                <li className={`${ activeTab === 1 ? 'dark:bg-gray-900 text-blue-600 dark:text-blue-500' : 'hover:text-blue-600 dark:hover:text-blue-500'} grow `} onClick={() => setActiveTab(1)} >
                    <button className="p-4 uppercase">
                        Looks
                    </button>
                </li>
                <li className={`${ activeTab === 2 ? 'dark:bg-gray-900 text-blue-600 dark:text-blue-500' : 'hover:text-blue-600 dark:hover:text-blue-500'} grow `} onClick={() => setActiveTab(2)} >
                    <button className="p-4 uppercase">
                        Retouching
                    </button>
                </li>
                <li className={`${ activeTab === 3 ? 'dark:bg-gray-900 text-blue-600 dark:text-blue-500' : 'hover:text-blue-600 dark:hover:text-blue-500'} grow `} onClick={() => setActiveTab(3)} >
                    <button className="p-4 uppercase">
                        Videos
                    </button>
                </li>
                <li className={`${ activeTab === 4 ? 'dark:bg-gray-900 text-blue-600 dark:text-blue-500' : 'hover:text-blue-600 dark:hover:text-blue-500'} grow `} onClick={() => setActiveTab(4)} >
                    <button className="p-4 uppercase">
                        Extras
                    </button>
                </li>
            </ul>
        </div>
        <div id="TabContent">
            <div className={`${activeTab !== 1 ? 'hidden' : ''} p-4 text-white tab-content mx-auto text-center`}>
                <p className='text-3xl'>
                    How many looks would you like to shoot?
                </p>
                <div className='grid gap-4 grid-cols-4 grid-rows-2 my-10'>
                    {
                        [...Array(8).keys()].map((i) => {
                            return <label htmlFor={`file-1${i}`} key={`f-${i}`}>
                                        <input type="radio" name='file-1' id={`file-1${i}`} value="field file" /> Field File 1
                                    </label>
                        })
                    }
                </div>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                    Neque porro quisquam est. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
            </div>
            <div className={`${activeTab !== 2 ? 'hidden' : ''} p-4 text-white tab-content mx-auto text-center`}>
                <p className='text-3xl'>
                    How many looks would you like to shoot?
                </p>
                <div className='grid gap-4 grid-cols-4 grid-rows-2 my-10'>
                    {
                        [...Array(8).keys()].map((i) => {
                            return <label htmlFor={`file-2${i}`} key={`f-${i}`}>
                                        <input type="radio" name='file-2' id={`file-2${i}`} value="field file" /> Field File 2
                                    </label>
                        })
                    }
                </div>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                    Neque porro quisquam est. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
            </div>
            <div className={`${activeTab !== 3 ? 'hidden' : ''} p-4 text-white tab-content mx-auto text-center`}>
                <p className='text-3xl'>
                    How many looks would you like to shoot?
                </p>
                <div className='grid gap-4 grid-cols-4 grid-rows-2 my-10'>
                    {
                        [...Array(8).keys()].map((i) => {
                            return <label htmlFor={`file-3${i}`} key={`f-${i}`}>
                                        <input type="radio" name='file-3' id={`file-3${i}`} value="field file" /> Field File 3
                                    </label>
                        })
                    }
                </div>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                    Neque porro quisquam est. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
            </div>
            <div className={`${activeTab !== 4 ? 'hidden' : ''} p-4 text-white tab-content mx-auto text-center`}>
                <p className='text-3xl'>
                    How many looks would you like to shoot?
                </p>
                <div className='grid gap-4 grid-cols-4 grid-rows-2 my-10'>
                    {
                        [...Array(8).keys()].map((i) => {
                            return <label htmlFor={`file-4${i}`} key={`f-${i}`}>
                                        <input type="radio" name='file-3' id={`file-4${i}`} value="field file" /> Field File 4
                                    </label>
                        })
                    }
                </div>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                    Neque porro quisquam est. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
            </div>
        </div>

        </>
    );
}
 
export default Tabs;