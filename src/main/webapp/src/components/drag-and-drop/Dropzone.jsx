import React from 'react';
import { useDropzone } from "react-dropzone";
import styles from '../../static/dropzone.module.css';

const Dropzone = ({ onDrop, accept }) => {
    // Initializing useDropzone hooks with options
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    /*
      useDropzone hooks exposes two functions called getRootProps and getInputProps
      and also exposes isDragActive boolean
    */

    return (
        <div className={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={styles.textCenter}>
                {isDragActive ? (
                    <p className={styles.dropzoneContent}>Release to drop the files here</p>
                ) : (
                    <p className={styles.dropzoneContent}>
                        Drop Here
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dropzone;