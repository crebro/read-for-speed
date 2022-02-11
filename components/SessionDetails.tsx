import type { NextPage } from "next";

interface Props {
    words: string[],
    currentIndex: number,
    allowSelection: boolean,
    onSelection: (index: number) => void,
}

const SessionDetails: NextPage<Props> = (props) => {
    return <div className="h-screen p-4 w-1/5 absolute top-0 right-0 bg-gray-300">
        {
            props.words.map((word, index) => {
                return <span onClick={() => { if (props.allowSelection) {props.onSelection(index)} }} key={index} className={`${index === props.currentIndex ? "bg-white" : ''} mx-1 cursor-pointer`}> {word} </span>
            })
        }
    </div>
}

export default SessionDetails;
