import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageWrapper: {
      flex: 1.2,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    smallImageWrapper: {
      position: "absolute",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    orangeBlock: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "50%",
      height: "60%",
      backgroundColor: "#D48C3A",
      borderBottomRightRadius: 30,
    },
    orangeBlockRight: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "50%",
      height: "60%",
      backgroundColor: "#D48C3A",
      borderBottomLeftRadius: 30,
    },
    smallImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "white",
    },
    largeImage: {
      width: 220,
      height: 320,
      borderRadius: 20,
      borderWidth: 4,
      borderColor: "white",
    },
    lowerContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#2C2C2C",
      textAlign: "center",
      marginBottom: 12,
    },
    highlight: {
      color: "#D48C3A",
    },
    subtitle: {
      fontSize: 16,
      color: "#555",
      textAlign: "center",
      marginBottom: 24,
    },
    button: {
      backgroundColor: "#D48C3A",
      paddingVertical: 14,
      paddingHorizontal: 60,
      borderRadius: 30,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  
  export default styles;