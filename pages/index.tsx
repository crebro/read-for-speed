import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [contents, setContents] = useState<string>('');
  const [wordIndex, setWordIndex] = useState(0);
  const [wordList, setWordList] = useState<string[]>(["Hello!"]) ;
  const [reading, setReading] = useState(false);

  const getWordList = (contents: string) => {
    setWordList(contents.split(' '));
  }

  const startReading = () => {
    getWordList(contents);
    setReading(true);
  }

  useEffect(() => {
    console.log("this is getting called outside of the thing");
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => {
        if (prevIndex >= wordList.length - 1) {
          window.clearInterval(interval);
          setReading(false);
          console.log("this is getting called to stop the operation");
        }
        return prevIndex + 1
      });
    }, 150);
  }, [reading])
  
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center '>
      <Head>
        <title> Read for speed, read documents like pro, without spending a minute more </title>
      </Head>
      <div className='w-[50%]'>
        <div className='text-2xl font-bold'> Read-For-Speed </div>
        <div className='text-xl '> Read documents like a pro, without spending a minute more</div>
        {
          !reading ? 
          <textarea className='w-full py-2 px-2 border-1 bg-gray-300 rounded-lg border-red-100 outline-1 outline-blue-700' onChange={(e) => setContents(e.currentTarget.value)} rows={10} defaultValue={"Type your content here"} />
          : <div className='text-3xl flex items-center justify-center'>
            { wordList[wordIndex] }
           </div>
        }
        <button onClick={() => startReading()} className='bg-red-500 my-2 text-white px-4 py-2 w-full'> Start Reading </button>
      </div>
    </div>
  )
}

export default Home
