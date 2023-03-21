import { Text } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';

const RichText = (props) => {
    const { richItems } = props
    var { normalStyle } = props
    if (normalStyle == null) {
        normalStyle = styles.text
    }
    var { richStyle } = props
    if (richStyle == null) {
        richStyle = styles.richText
    }
    return (
        <Text style={normalStyle}>{richItems.map(e => (<Text style={e.isRich ? richStyle : normalStyle}>{e.text}</Text>))}</Text>
    )
};

export default RichText;
