import { Text } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';

const RichText = (props) => {
    const { richItems } = props
    if (typeof (richItems) == "undefined") {
        return (<></>)
    }

    let { normalStyle } = props
    if (normalStyle == null) {
        normalStyle = styles.text
    }
    let { richStyle } = props
    if (richStyle == null) {
        richStyle = styles.richText
    }
    return (
        <Text style={normalStyle}>{richItems.map(e => (<Text style={e.isRich ? richStyle : normalStyle}>{e.text}</Text>))}</Text>
    )
};

export default RichText;
