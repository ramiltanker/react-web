import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { FC, memo } from "react";

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    display: "flex",
    gap: "5px",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  wrapper: {
    width: "100%",
    display: "flex",
    gap: "15px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  photo: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  },
});

export interface UserInfoDocumentProps {
  name: string;
  surname: string;
  age: string;
  avatar: any;
}

const UserInfoDocument: FC<UserInfoDocumentProps> = memo((props) => {
  const { age, avatar, name, surname } = props;

  console.log(avatar);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.wrapper}>
          <View style={styles.info}>
            <View style={styles.section}>
              <Text>Name:</Text>
              <Text>{name}</Text>
            </View>
            <View style={styles.section}>
              <Text>Surname:</Text>
              <Text>{surname}</Text>
            </View>
            <View style={styles.section}>
              <Text>Age:</Text>
              <Text>{age}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text>Avatar:</Text>
            <Image src={avatar} style={styles.photo} />
          </View>
        </View>
      </Page>
    </Document>
  );
});

export { UserInfoDocument };
