import React, {
  useState
} from "react";
import {
  ScrollView,
  Button,
  Text,
  View
} from "react-native";
import stylesheet from "./stylesheet";
import {
  Card
} from "./components";

const FAKE_API_URL = "https://fakeapi.nibgat.space/members";

const App = () => {
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getUserDatas = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(FAKE_API_URL);
      if (!response.ok) {
        throw response;
      }
  
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoading = () => {
    if(!loading) {
      return null;
    }

    return <Text>
      Yükleniyor...
    </Text>;
  };

  const renderUserCards = () => {
    if(loading) {
      return null;
    }

    return <ScrollView>
      {data.map((item) => (
        <Card
          imgUrl={item.profilePhotoURL}
          fullname={item.fullName}
          age={item.age}
          key={item.id}
        />
      ))}
    </ScrollView>;
  };

  const renderLoadDataButton = () => {
    if(isRequestFinished || loading) {
      return null;
    }

    return <Button
      title="Verileri Yükle"
      onPress={getUserDatas}
    </Button>
  };

  return <View style={stylesheet.container}>
      {renderLoadDataButton()}
      {renderLoading()}
      {renderUserCards()}
  </View>;
};
export default App;
