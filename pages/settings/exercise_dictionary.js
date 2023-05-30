import Head from "next/head";
import { useEffect, useState } from 'react';
import ExerciseBlock from "../../shared/components/Home/ExerciseBlock";
import { ExerciseModal } from "../../shared/components/Home/ExerciseModal";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

function useExercise(nameSubstring) {
    const [exerciseList, setExerciseList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/exercise')
            .then((res) => {
                return res.json();
            })
            .then((exerciseList) => {
                setExerciseList(exerciseList);
                setLoading(false);
            });
    }, []);

    const filteredList = [];
    exerciseList.map(exercise => {
        if (exercise.name.includes(nameSubstring)) {
            filteredList.push(exercise);
        }
    })

    if (isLoading) return <p>Loading...</p>;
    if (!filteredList || filteredList.length === 0) {
        return <div className="text-center">No exercise found</div>;
    }

    return (
        <div className="three-columns">
            {filteredList.map((exercise) => (
                <ExerciseBlock exercise={exercise} key={exercise.name} />
            ))}
        </div>
    );
}


export default function ExerciseDictionary({ username }) {

    const [nameSubstring, setNameSubstring] = useState("");
    const onChange = (e) => {
        setNameSubstring(e.target.value);
    };

    return (
        <div>
            <Head>
                <title>Exercise Dictionary</title>
                <meta
                    name="description"
                    content="Exercise Dictionary"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <input
                className="button-middle"
                onChange={onChange}
                id='search-exercise'
                type="search"
                name="search-exercise"
                value={nameSubstring}
                placeholder="Search exercise..." />
            <ExerciseModal exercise={{}} button={{ text: "Add new", className: "m-center back-color-black" }}></ExerciseModal>
            <div className="space-top-15px">
                {useExercise(nameSubstring)}
            </div>
        </div>
    );
}

export const getServerSideProps = withIronSessionSsr(
    async ({ req, res }) => {
        const username = req.session.username;

        if (!username) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
            }
        }

        return {
            props: { username }
        }
    },
    sessionOptions
);