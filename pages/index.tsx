import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import SessionDetails from  "../components/SessionDetails";

const Home: NextPage = () => {
  const [contents, setContents] = useState<string>('');
  const [wordIndex, setWordIndex] = useState(0);
  const [wordList, setWordList] = useState<string[]>(["Hello!"]) ;
  const [reading, setReading] = useState(false);
  const [playingInterval, setPlayingInterval] = useState<NodeJS.Timer | null>();
  const [paused, setPaused] = useState(false);

  const getWordList = (contents: string) => {
    setWordList(contents.split(' '));
  }

  const startReading = () => {
    getWordList(contents);
    setReading(true);
  }

  const startInterval = () : NodeJS.Timer => {
    const interval = setInterval(() => {
        setWordIndex((prevIndex) => {
          if (prevIndex >= wordList.length - 1) {
            window.clearInterval(interval);
            setReading(false);
            setWordIndex(0);
            setPlayingInterval(null);
          }
          return prevIndex + 1
        });
    }, 200);
    return interval;
  };

  const stopReading = () => {
    if (playingInterval) {
      window.clearInterval(playingInterval);
    }
    setReading(false);
    setWordIndex(0);
    setPaused(false);
    setPlayingInterval(null);
  }

  const togglePause = () => {
    if (paused) {
      const interval = startInterval();
      setPaused(false);
      setPlayingInterval(interval);
      return;
    }
    if (playingInterval) {
      window.clearInterval(playingInterval);
      setPaused(true);
      setPlayingInterval(null);
    }
  }

  useEffect(() => {
    if (reading) {
      const interval = startInterval();
      setPlayingInterval(interval);
    }
  }, [reading]);
  
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center '>
      <Head>
        <title> Read for speed, read documents like pro, without spending a minute more </title>
      </Head>
      <div className='w-[50%] transition duration-150'>
        <div className='text-2xl font-bold'> Read-For-Speed </div>
        <div className='text-xl '> Read documents like a pro, without spending a minute more</div>
        {
          !reading ? 
          <textarea className='w-full py-2 px-2 border-1 bg-gray-300 rounded-lg border-red-100 outline-1 outline-blue-700 mt-4' onChange={(e) => setContents(e.currentTarget.value)} rows={10} defaultValue={contents} />
          : <div className='my-10 text-xl flex items-center justify-center'>
            {
              wordList.slice(wordIndex - 3, wordIndex - 1).map((word, index) => {
                return <span key={index} className='mx-2 w-1/5 flex items-center justify-center'> {word} </span>
              })
            }
            <span className='font-bold mx-2 w-1/5 flex items-center justify-center'>{ wordList[wordIndex] } </span>
            {
              wordList.slice(wordIndex + 1, wordIndex + 3).map((word, index) => {
                return <span key={index} className='mx-2 w-1/5 flex items-center justify-center'> {word} </span>
              })
            }
           </div>
        }
        <div className='flex items-center justify-center'>
          <button onClick={() =>  !reading ? startReading() : stopReading()} className={`${ reading ? 'bg-red-500' : 'bg-indigo-500'} rounded-lg transition duration-150 my-2 text-white px-4 py-2 w-full mr-2`}> { reading ? "Stop Reading" : "Start Reading" } </button>
          {
            reading ?   
            <button onClick={() =>  togglePause()} className={`bg-indigo-500 rounded-lg transition duration-150 my-2 text-white px-4 py-2 w-full ml-2`}> { !paused ? "Pause Reading Session" : "Continue Reading Session" } </button>
            : ""
          }
        </div>
      </div>
      <SessionDetails onSelection={(index) => setWordIndex(index) } words={wordList} currentIndex={wordIndex} allowSelection={ paused && reading }/>
    </div>
  )
}

export default Home
