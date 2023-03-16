import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tagRemoved, tagSeleteced } from '../features/filter/filterSlice';

export default function Tag({tag}) {
    const dispatch = useDispatch();
    const {tags: selectedTags} = useSelector(state => state.filter);

    const isSeletcted = selectedTags.includes(tag.title) ? true : false;

    const handleSelect = () => {
        if(isSeletcted) {
            dispatch(tagRemoved(tag.title));
        }
        else {
            dispatch(tagSeleteced(tag.title))
        }
    }

    const style = isSeletcted ? "bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer": "bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer"

    return (
        <>
            <div
                className={style}
                onClick={handleSelect}
            >
                {tag.title}
            </div>
           
        </>
    )
}


