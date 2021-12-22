import { useState } from 'react'
import styles from './index.module.css'
import Button from '../UI/Button'


const Completeorder = () => {
    const [store, setStore] = useState('')
    const [nameStore, setNameStore] = useState('')
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('')
    const [namePerson, setNamePerson] = useState('')
    const [specialInstruction, setSpecialInstruction] = useState('')
    const [showNewStoreFields, setShowNewStoreFields] = useState(false);
    const submitFn = () => {

    }

    return (
        <div className={styles.LoginRegister}>
            <div className={styles.Container}>
                <p className={styles.Heading}>Complete Order</p>
                <p className={styles.SubHeading}>
                    Add Store or Enter Store Details to Complete Order
                </p>
                {!showNewStoreFields && <InputField
                    title="Store Name"
                    type="Select"
                    value={store}
                    setValue={setStore}
                    placeholder="Add Store"
                />}

                <button
                    type="button"
                    className={styles.buttonShowHide}
                    onClick={() => setShowNewStoreFields(!showNewStoreFields)}>{!showNewStoreFields ? "Add Store Manually" : "Add From Existing Store"}</button>
                {showNewStoreFields && <>
                    <InputField
                        title="Person Name"
                        type="text"
                        id="namePerson"
                        value={namePerson}
                        setValue={setNamePerson}
                        placeholder="Enter Person Name"
                    />
                    <InputField
                        title="Store Name"
                        type="text"
                        id="nameStore"
                        value={nameStore}
                        setValue={setNameStore}
                        placeholder="Enter Store Name"
                    />
                    <InputField
                        title="Address"
                        type="text"
                        id="address"
                        value={address}
                        setValue={setAddress}
                        placeholder="Enter Address"
                    />
                    <InputField
                        title="Phone Number"
                        type="number"
                        id="phoneNumber"
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                        placeholder="Enter Phone Number"
                    />
                    <InputField
                        title="Special Instruction"
                        type="text"
                        id="specialInstruction"
                        value={specialInstruction}
                        setValue={setSpecialInstruction}
                        placeholder="Enter Special Instruction"
                    />
                </>
                }

                <Button
                    onClick={submitFn}
                    className={styles.SubmitButton}

                    block
                >
                    Complete Order
                </Button>
            </div>
        </div>
    )
}

export default Completeorder

const InputField = (props) => {
    const { title, type, value, setValue, placeholder, id } = props
    return (
        type === "Select" ? <div className={styles.InputField}>
            <div className={styles.InputTitle}>{title}</div>
            <select
                className={styles.InputBox}
                placeholder={placeholder}
                type="select"
                value={value}
                id={id}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="">Select Store</option>
                <option>jguogou</option>
                <option>jguogou</option>
                <option>jguogou</option>
                <option>jguogou</option>
            </select>

        </div>
            :
            <div className={styles.InputField}>
                <div className={styles.InputTitle}>{title}</div>
                <input
                    className={styles.InputBox}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    id={id}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
    )
}
