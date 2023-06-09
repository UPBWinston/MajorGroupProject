import React, {useState} from "react";
import {Modal, Button, Dropdown} from '@nextui-org/react';
import {getApiCallOptions} from "../../../pages/api/utils"

const colors = ['#ffe58f', '#eaff8f', '#b7eb8f', '#87e8de', '#ffd6e7'];
const unitTypes = ["seconds", "minutes", "hours"];

export const ExerciseModal = ({ exercise, button}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modalColor, setModalColor] = useState(exercise.color || colors[0]);
    const changeModalColor = (color) => setModalColor(color);
    
    function refreshPage() {
        window.location.reload(false);
    }

    const [selected, setSelected] = React.useState(new Set(["minutes"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    const addOrUpdateExercise = async function (event){
        event.preventDefault();
        const name = event.target.elements.name.value;
        const amount = event.target.elements.amount.value;
        const calories = event.target.elements.calories.value;

        setOpen(false);
        const data = {
            name: name,
            calories: calories,
            amount: amount,
            unit: selectedValue,
            color: modalColor
        }
    
        await fetch("/api/exercise", getApiCallOptions("POST", data))
        refreshPage();
    }

    return (
        <div className="space-top-15px">
            <Button onClick={handleOpen} className={button.className} color={button.color}>{button.text}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form
                    className="flex flex-direction-column justify-content-between p-1"
                    style={{
                        borderTop: `20px solid ${modalColor}`
                    }}
                    onSubmit={addOrUpdateExercise}
                >
                    <label htmlFor="name">exercise</label>
                    <input
                        defaultValue={exercise.name}
                        type="text"
                        autoComplete="off"
                        id="name"
                        name="name"
                        readOnly={exercise.name}
                        required
                    />

                    <label htmlFor="amount">amount</label>
                    <div className="flex justify-content-between w-100">
                    <input
                        defaultValue={exercise.amount}
                        type="number"
                        id="amount"
                        name="amount"
                        required
                        min="1"
                        step="1"
                    />

                    <Dropdown
                        id="unit"
                        name="unit">
                        <Dropdown.Button flat color="white">{selectedValue}</Dropdown.Button>
                        <Dropdown.Menu aria-label="Single selection actions"
                                       disallowEmptySelection
                                       selectionMode="single"
                                       selectedKeys={selected}
                                       onSelectionChange={setSelected}>
                            {unitTypes.map(
                                unitType => {
                                    return(<Dropdown.Item key={unitType}>{unitType}</Dropdown.Item>);
                                }
                            )}
                        </Dropdown.Menu>

                     </Dropdown>
                    </div>
                    <label htmlFor="calories">calories</label>
                    <input
                        defaultValue={exercise.calories}
                        type="number"
                        id="calories"
                        name="calories"
                        required
                        min="1"
                        step="1"
                    />

                    <div className="text-gray text-small mb-04">
                        select a color
                    </div>
                    <div className="flex mb-1 m-center space-bot-15px">
                        {colors.map(color => {
                            return (
                                <input
                                    onClick={() => changeModalColor(color)}
                                    className="circle mr-1 cursor-pointer"
                                    style={{
                                        backgroundColor: color,
                                        border:
                                            color === color
                                                ? '3px solid #000000'
                                                : null
                                    }}
                                    title={`${color}`}
                                    id="color"
                                ></input>
                            );
                        })}
                    </div>

                    <Button
                        type="submit"
                        className="m-center back-color-black"
                        color="secondary"
                    >Submit</Button>
                </form>
            </Modal>
        </div>
    )
}