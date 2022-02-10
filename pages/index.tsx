import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const [contents, setContents] = useState<string>('');
  const [wordIndex, setWordIndex] = useState(0);
  const [wordList, setWordList] = useState<string[]>(["Hello!"]) ;
  const [reading, setReading] = useState(false);
  const [playingInterval, setPlayingInterval] = useState<NodeJS.Timer | null>();

  const getWordList = (contents: string) => {
    setWordList(contents.split(' '));
  }

  const startReading = () => {
    getWordList(contents);
    setReading(true);
  }

  const stopReading = () => {
    if (playingInterval) {
      window.clearInterval(playingInterval);
      setReading(false);
      setWordIndex(0);
      setPlayingInterval(null);
    }
  }

  useEffect(() => {
    if (reading) {
      const interval = setInterval(() => {
        console.log('I am wondienrg');
        setWordIndex((prevIndex) => {
          if (prevIndex >= wordList.length - 1) {
            window.clearInterval(interval);
            setReading(false);
            setWordIndex(0);
            setPlayingInterval(null);
          }
          return prevIndex + 1
        });
      }, 150);
      setPlayingInterval(interval);
    }
  }, [reading])
  
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
          <textarea className='w-full py-2 px-2 border-1 bg-gray-300 rounded-lg border-red-100 outline-1 outline-blue-700' onChange={(e) => setContents(e.currentTarget.value)} rows={10} defaultValue={contents} />
          : <div className='font-bold my-10 text-3xl flex items-center justify-center'>
            { wordList[wordIndex] }
           </div>
        }
        <button onClick={() =>  !reading ? startReading() : stopReading()} className={`${ reading ? 'bg-red-400' : 'bg-indigo-500'} transition duration-150 my-2 text-white px-4 py-2 w-full`}> { reading ? "Stop Reading" : "Start Reading" } </button>
      </div>
    </div>
  )
}

export default Home
