import React, {Component, Fragment} from 'react';
import styles from "../../static/signup.module.css";
import styles1 from "../../static/dropzone.module.css";
import Dropzone from "./Dropzone";

export default class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: null
        }
    }

    printFile(acceptedFiles) {
        console.log(acceptedFiles);
        acceptedFiles.map(file => {
            let formData = new FormData();
            formData.append("file", file);
            this.setState({"formData": formData});
            let reader = new FileReader();

            reader.onload = function(e) {
                let content = reader.result;

                alert(content);
            }
        });
        this.props.passedFunction(this.state.formData);
    }

    render() {
        return(
            <Fragment>
                <h5>Upload Document</h5>
                <hr className={styles.marginHr}></hr>
                <main className={styles1.App}>
                    <h6>Attach Document</h6>
                    <Dropzone onDrop={acceptedFiles => this.printFile(acceptedFiles)} accept={".csv"} />
                    <h6>Accepted file types: .csv</h6>
                </main>
                {/*<Button onClick={this.getResult} variant="contained" color="secondary">Show Result</Button>*/}
            </Fragment>
        )
    }

}