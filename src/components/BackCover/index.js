import { Text, Image, View } from '@react-pdf/renderer';
import qrcode from 'src/static/qrcode.png';
import styles from 'src/pdfStyles';
import { memo } from 'react';

const BackCover = () => {
  return (
    <View style={styles.pageContainer} bookmark={{ title: "BackCover", fit: true }}>
      <View style={styles.backCoverImageContainer}>
        <Image style={styles.backCoverImage} src={qrcode} />
      </View>
      <Text style={styles.backCoverTitle} id='link_back_cover'>Copyright © 2023 Wiredcraft Co. Ltd.</Text>
    </View>
  )
}

export default memo(BackCover);
