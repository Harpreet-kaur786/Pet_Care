import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      padding: 20,
      //alignItems: 'center'
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 15,
      alignItems: "center",
      alignContent: "center",
    },
    align: {
      alignItems: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 12,
      color: "#444",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 20,
      color: "#007AFF",
    },
    infoContainer: {
      alignSelf: "stretch",
      alignItems: "center",
    },
    info: {
      fontSize: 16,
      color: "#666",
      textAlign: "left",
      width: "85%",
    },
    input: {
      borderBottomWidth: 1,
      width: "85%",
      fontSize: 18,
      marginVertical: 8,
      paddingVertical: 5,
      borderColor: "#ccc",
    },
    addButton: {
      fontSize: 18,
      color: "#007AFF",
      marginTop: 12,
      fontWeight: "500",
    },
    btn: {
      marginTop: 10,
      marginBottom: 10,
      width: "50%",
      alignItems: "center",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: 20,
    },
    modalContainer: {
      backgroundColor: "white",
      padding: 25,
      borderRadius: 12,
      width: "85%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    },
    modalLabel: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#444",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "50%",
      marginTop: 15,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    },
    deleteButton: {
      color: "red",
    },
    centeredSection: {
      alignItems: "center",
    },
    headerContainer: {
      width: '100%',
      backgroundColor: '#4CAF50',
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
  },
  headerText: {
      fontSize: 20,  
      fontWeight: 'bold',
      color: 'white',
  },
  divider: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginTop: 10,
  },
  });

  export default styles;