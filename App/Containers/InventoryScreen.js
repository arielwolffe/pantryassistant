import React, { Component } from 'react'
import { ScrollView, Image, View, Form, Item, Input, Label, ListView  } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle, List, ListItem, Content, Text, Badge, Fab, Switch} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements'
import { Images } from '../Themes'
import styles from './Styles/PantryScreenStyles'

const datasInventory = [
  'Crix',
  'Cheese',
  'Bread',
  'Butter',
  'Milk',
  'Bottles water',
  'Sausages',
  'Dog Chow',
];


export default class InventoryScreen extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datasInventory,
      active: true
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

static navigationOptions = {
    title : 'My Inventory',
    tabBarLabel: 'Inventory',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={Images.inventoryIcon}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render () {
    return (
        <Container>
           <Header>
           <Body>
             <Title style={styles.headerTitle}>My Inventory</Title>
             <Subtitle>Pantry Assistant</Subtitle>
           </Body>
         </Header>
         <View style={styles.searchAndFabView}>
         <Fab small
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={styles.fabStyle}
            text="Add Items to your pantry..."
            position="bottomRight"
            onPress={() => {
              this.setState({ active: !this.state.active }) 
                alert('Add a new Item Here!')
                }}>
            <Icon name="add" />
          </Fab>
          <SearchBar round
            lightTheme
            //onChangeText={someMethod}
            placeholder='Search your inventory items...' />
          </View>
          <Content>
          <List style={styles.listMargin}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem icon>
                <Left>
                  <Icon name="star" />
                </Left>
                <Body>
                  <Text> {data} </Text>
                </Body>
                <Right>
                <Icon name="menu" />
              </Right>
              </ListItem>}

            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
               <Button success onPress={() => alert(data)} style={{flex:1, flexDirection:'row', marginRight: 10}}>
                <Image
                  source={Images.addToPantryIcon}
                />
              </Button>
          }

            renderRightHiddenRow={data =>
              <Button warning onPress={() => alert(data)} style={{flex:1, flexDirection:'row'}}>
              <Image
                  source={Images.addToListIcon}
                />
              </Button>
               }
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    )
  }
}
