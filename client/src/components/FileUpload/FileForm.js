import React, { Fragment, useState, useEffect } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileForm = ({ setImgName, imgName }) => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [msg, setMsg] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    useEffect(() => {
        if (imgName) {
            setFilename(imgName);
        }
    }, [imgName])

    const onChange = e => {
        //file upload allows for multiple files
        //e.target.files returns an array
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setImgName(e.target.files[0].name);
    }
    //clean up mem leak later
    //from:
    //https://medium.com/@selvaganesh93/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7
    const abortController = new AbortController();
    const signal = abortController.signal;

    //async is used bc this is an arrow func
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        //'file' is used because of: const file = req.files.file;
        //in server.js
        formData.append('file', file);

        try {
            const res = await axios.post('/api/ebooks/uploadimg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                //set upload progress
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                    //clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                },
                signal: signal
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            setMsg('File Uploaded');

        } catch (err) {
            console.log(err);
            if (err.response.status === 500) {
                setMsg('There was a problem with the server');
            } else {
                setMsg(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            {msg ? <Message msg={msg} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4" >
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <Progress percentage={uploadPercentage} />
                <input type="submit" value="Submit" className="btn btn-primary btn-block mt-4" />
            </form>
            {uploadedFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedFile.fileName}</h3>
                    <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
                </div>
            </div> : null}
        </Fragment>
    )
}

export default FileForm

