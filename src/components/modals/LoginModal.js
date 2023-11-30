"use client"
import { toggleModal } from '@/store/features/modal-slice';
import { useDispatch, useSelector } from 'react-redux';

const LoginModal = ({ children }) => {
    const { isOpen } = useSelector((state) => state.modalReducer.value);
    const dispatch = useDispatch()
    if (!isOpen) return null;

    function handleClose(e) {
        if (e.target.id === "wrapper") {
            dispatch(toggleModal({ isOpen: false }))
        }
    }
    function closeModal() {
        dispatch(toggleModal({ isOpen: false }))

    }
    return (
        <div className="fixed inset-0 bg-black
        bg-opacity-25 backdrop-blur-sm flex  
        justify-center items-center" id='wrapper' onClick={handleClose}>
            <div className='w-[400px] flex flex-col bg-white rounded-lg'>
                <div className=' text-whtie text-end flex flex-row justify-between text-xl p-2 rounded-t-lg'>
                    <p className='text-center mt-2'>Login / Sign Up</p>
                    <button onClick={closeModal} className='rounded-md w-10 bg-red-500 hover:bg-red-600 p-2'>X</button>
                </div>
                <div className=' p-2 rounded'>
                    {children}
                </div>
            </div>
        </div >
    );
};

export default LoginModal;
