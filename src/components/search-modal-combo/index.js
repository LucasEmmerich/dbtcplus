import * as React from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Modal, Pressable, Text, TextInput } from 'react-native';
import style from './style';

const SearchModalCombo = (props) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true) ;
    const hideModal = () => setVisible(false);

    const onSelect = (item) => {
        hideModal();
        props.onSelect(item);
    }
    return (
        <ScrollView>
            <TouchableOpacity style={style.mainButton} onPress={showModal}>
                <Text style={style.mainButtonText}>{props.label ?? 'Pesquise:'}</Text>
            </TouchableOpacity>
            <Modal visible={visible} onDismiss={hideModal}>
                <Text style={style.label ?? ''}>{props.label}</Text>
                <TextInput
                    onChangeText={props.onChangeSearchText}
                    style={style.input}
                />
                <FlatList
                    data={props.data}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                style={style.item}
                                onPress={() => onSelect(item)}
                                title={item}>
                                <Text style={style.itemText}>{item}</Text>
                            </Pressable>
                        )
                    }}
                />
                <Button onPress={hideModal} title={'Voltar'} />
            </Modal>
        </ScrollView>
    );
};

export default SearchModalCombo;