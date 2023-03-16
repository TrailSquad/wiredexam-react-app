import { Text } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';

const RichText = (props) => {
    const {richItems} = props
    return (
        <Text style={styles.text}>{richItems.map(e => (<Text style={e.isRich ? styles.richText : styles.text}>{e.text}</Text>))}</Text>
    )
};

export default RichText;
