import Head from "next/head";
import { useEffect, useState } from 'react';
import FoodBlock from "../../shared/components/Home/FoodBlock";
import {FoodModal} from "../../shared/components/Home/FoodModal";
import {withIronSessionSsr} from "iron-session/next/index";
import {sessionOptions} from "../../lib/session";

function useFood(nameSubstring){
    const [foodList, setFoodList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/food')
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((foodList) => {
                setFoodList(foodList);
                setLoading(false);
            });
    }, []);



    const filteredList = [];
    foodList.map(food => {
        if(food.name.includes(nameSubstring)){
            filteredList.push(food);
        }
    })

    if (isLoading) return <p>Loading...</p>;
    if (!filteredList || filteredList.length === 0) {
        return <div className="text-center">No food found</div>;
    }

    return (
        <div className="three-columns">
        {filteredList.map((food) => (
                <FoodBlock food={food} key={food.name}/>
            ))}
        </div>
    );
}


export default function FoodDictionary ({username}){

    const [nameSubstring, setNameSubstring] = useState("");
    const onChange = (e) =>{
        setNameSubstring(e.target.value);
    };

      return (
        <div>
            <Head>
                <title>Food Dictionary</title>
                <meta
                    name="description"
                    content="Food Dictionary"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <input
                className="button-middle"
                onChange={onChange}
                id='search-food'
                type="search"
                name="search-food"
                value={nameSubstring}
                placeholder="Search food..." />
            <FoodModal food={{}} button={{text:"Add new", className:"m-center back-color-black"}}></FoodModal>
            <div className="space-top-15px">
                {useFood(nameSubstring)}
            </div>
        </div>
    );
}

export const getServerSideProps = withIronSessionSsr(
    async ({req, res}) => {
        const username = req.session.username;

        if(!username) {
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