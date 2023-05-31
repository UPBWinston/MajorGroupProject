import Image from 'next/image';
import watermelonIcon from '../../../public/icons/watermelon.svg';

const EmptyExerciseBlocks = ({ addEmptyExerciseBlock }) => {
    return (
        <>
            <div className="no-food-blocks-emoji">
                <Image
                    height={140}
                    width={140}
                    src={watermelonIcon}
                    alt="watermelon icon"
                />
            </div>
            <p className="text-center text-medium mb-1">no exercise blocks</p>
            <button
                className="dark-text text-large text-decoration-underline d-block m-center"
                onClick={() => addEmptyExerciseBlock()}
            >
                add an exercise block
            </button>
        </>
    );
};

export default EmptyExerciseBlocks;
