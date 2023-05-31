import React, {useState} from "react";
import {Modal, Button, Dropdown} from '@nextui-org/react';
import {addWorkout} from "../../exercise/workout";
import {refreshPage} from "../../../pages/api/utils";

const colors = ['#ffe58f', '#eaff8f', '#b7eb8f', '#87e8de', '#ffd6e7'];
const unitTypes = ["seconds", "minutes", "hours"];
const workoutTypes = ["srengthTraining", "cardio"];

export const WorkoutModal = ({workout, button}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modalColor, setModalColor] = useState(workout.color || colors[0]);
    const changeModalColor = (color) => setModalColor(color);

    const [selectedUnit, setSelectedUnit] = React.useState(new Set([workout.unit]));
    const selectedUnitValue = React.useMemo(
        () => Array.from(selectedUnit).join(", ").replaceAll("_", " "),
        [selectedUnit]
    );

    const [selectedType, setSelectedType] = React.useState(new Set([workout.type]));
    const selectedTypeValue = React.useMemo(
        () => Array.from(selectedType).join(", ").replaceAll("_", " "),
        [selectedType]
    );

    const addOrUpdateWorkout = async function (event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const amount = event.target.elements.amount.value;
        const calories = event.target.elements.calories.value;
        const sessions = event.target.elements.sessions.value;

        setOpen(false);
        await addWorkout({
            exerciseName: name,
            calories: calories,
            amount: amount,
            sessions: sessions,
            color: modalColor,
            date: workout.date,
            type: selectedTypeValue,
            unit: selectedUnitValue,
        });
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
                    onSubmit={addOrUpdateWorkout}
                >
                    <Dropdown
                        id="type"
                        name="type">
                        <Dropdown.Button flat color="white">{selectedTypeValue}</Dropdown.Button>
                        <Dropdown.Menu aria-label="Single selection actions"
                                       disallowEmptySelection
                                       selectionMode="single"
                                       selectedKeys={selectedType}
                                       onSelectionChange={setSelectedType}>
                            {workoutTypes.map(
                                workoutType => {
                                    return (<Dropdown.Item key={workoutType.toString()}>{workoutType}</Dropdown.Item>);
                                }
                            )}
                        </Dropdown.Menu>

                    </Dropdown>
                    <label htmlFor="date">date</label>
                    <input
                        defaultValue={workout.date}
                        type="text"
                        autoComplete="off"
                        id="date"
                        name="date"
                        readOnly={workout.date}
                        required
                    />

                    <label htmlFor="amount">sessions</label>
                    <div className="flex justify-content-between w-100">
                        <input
                            defaultValue={workout.sessions}
                            type="number"
                            id="sessions"
                            name="sessions"
                            required
                            min="1"
                            step="1"
                        />
                    </div>

                    <label htmlFor="name">exercise</label>
                    <input
                        defaultValue={workout.name}
                        type="text"
                        autoComplete="off"
                        id="name"
                        name="name"
                        readOnly={workout.name}
                        required
                    />

                    <label htmlFor="amount">amount</label>
                    <div className="flex justify-content-between w-100">
                        <input
                            defaultValue={workout.amount}
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
                            <Dropdown.Button flat color="white">{selectedUnitValue}</Dropdown.Button>
                            <Dropdown.Menu aria-label="Single selection actions"
                                           disallowEmptySelection
                                           selectionMode="single"
                                           selectedKeys={selectedUnit}
                                           onSelectionChange={setSelectedUnit}>
                                {unitTypes.map(
                                    unitType => {
                                        return (<Dropdown.Item key={unitType.toString()}>{unitType}</Dropdown.Item>);
                                    }
                                )}
                            </Dropdown.Menu>

                        </Dropdown>
                    </div>
                    <label htmlFor="calories">calories</label>
                    <input
                        defaultValue={workout.calories}
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