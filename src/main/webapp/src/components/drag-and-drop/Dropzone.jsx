import React from 'react';
import { useDropzone } from "react-dropzone";
import styles from '../../static/dropzone.module.css';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Dropzone = ({ onDrop, accept }) => {
    // Initializing useDropzone hooks with options
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    return (
        <div className={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={styles.textCenter}>
                {isDragActive ? (
                    <p className={styles.dropzoneContent}>Release to drop the files here</p>
                ) : (
                    <p className={styles.dropzoneContent}>
                        Drag and Drop Files Here <br/> OR <br/>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dropzone;