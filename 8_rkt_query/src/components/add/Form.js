// import Success from "../ui/Success";
import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form() {
    const [addVideo, {data: video, isLoading, isError, isSuccess}] = useAddVideoMutation();

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [link, setLink] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [date, setDate] = useState('')
    const [views, setViews] = useState('')

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setDuration('');
        setLink('');
        setThumbnail('');
        setDate('');
        setViews('');
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        addVideo({
            title,
            author,
            description,
            duration,
            date,
            views,
            thumbnail,
            link,
        });
        resetForm();
    }

    return (
        <form onSubmit={handleSubmit} action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput onChange={e => setTitle(e.target.value)} value={title} title="Video Title" />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput value={author} onChange={e => setAuthor(e.target.value)} title="Author" />
                        </div>

                        <div className="col-span-6">
                            <TextArea value={description} onChange={e => setDescription(e.target.value)} title="Description" />
                        </div>

                        <div className="col-span-6">
                            <TextInput value={link} onChange={e => setLink(e.target.value)} title="YouTube Video link" />
                        </div>

                        <div className="col-span-6">
                            <TextInput value={thumbnail} onChange={e => setThumbnail(e.target.value)} title="Thumbnail link" />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput value={date} onChange={e => setDate(e.target.value)} title="Upload Date" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput value={duration} onChange={e => setDuration(e.target.value)} title="Video Duration" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput value={views} onChange={e => setViews(e.target.value)} title="Video no of views" />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                    disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>

                {isSuccess && <Success message="Video was added successfully" />}
                {isError && <Error message="Error to video adding" />}
            </div>
        </form>
    );
}
