import React, {useState} from "react";
import {Modal, Button, Dropdown} from '@nextui-org/react';
import {addMeal} from "../../food/meal";
import {refreshPage} from "../../../pages/api/utils";

const colors = ['#ffe58f', '#eaff8f', '#b7eb8f', '#87e8de', '#ffd6e7'];
const unitTypes = ["grams", "milliliters", "teaspoons", "tablespoons", "cups", "pounds", "ounces"];
const mealTypes = ["breakfast", "lunch", "dinner"];

export const MealModal = ({meal, button}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modalColor, setModalColor] = useState(meal.color || colors[0]);
    const changeModalColor = (color) => setModalColor(color);

    const [selectedUnit, setSelectedUnit] = React.useState(new Set([meal.unit]));
    const selectedUnitValue = React.useMemo(
        () => Array.from(selectedUnit).join(", ").replaceAll("_", " "),
        [selectedUnit]
    );

    const [selectedType, setSelectedType] = React.useState(new Set([meal.type]));
    const selectedTypeValue = React.useMemo(
        () => Array.from(selectedType).join(", ").replaceAll("_", " "),
        [selectedType]
    );

    const addOrUpdateMeal = async function (event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const amount = event.target.elements.amount.value;
        const calories = event.target.elements.calories.value;
        const portions = event.target.elements.portions.value;

        setOpen(false);
        await addMeal({
            foodName: name,
            calories: calories,
            amount: amount,
            unit: selectedUnitValue,
            color: modalColor,
            date: meal.date,
            type: selectedTypeValue,
            portions: portions,
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
                    onSubmit={addOrUpdateMeal}
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
                            {mealTypes.map(
                                mealType => {
                                    return (<Dropdown.Item key={mealType.toString()}>{mealType}</Dropdown.Item>);
                                }
                            )}
                        </Dropdown.Menu>

                    </Dropdown>
                    <label htmlFor="date">date</label>
                    <input
                        defaultValue={meal.date}
                        type="text"
                        autoComplete="off"
                        id="date"
                        name="date"
                        readOnly={meal.date}
                        required
                    />

                    <label htmlFor="amount">portions</label>
                    <div className="flex justify-content-between w-100">
                        <input
                            defaultValue={meal.portions}
                            type="number"
                            id="portions"
                            name="portions"
                            required
                            min="1"
                            step="1"
                        />
                    </div>

                    <label htmlFor="name">food</label>
                    <input
                        defaultValue={meal.name}
                        type="text"
                        autoComplete="off"
                        id="name"
                        name="name"
                        readOnly={meal.name}
                        required
                    />

                    <label htmlFor="amount">amount</label>
                    <div className="flex justify-content-between w-100">
                        <input
                            defaultValue={meal.amount}
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
                        defaultValue={meal.calories}
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