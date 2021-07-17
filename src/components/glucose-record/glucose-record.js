import React from 'react';
import { DataTable, Text } from 'react-native-paper';
import style from './style';
import moment from 'moment';
import { FontAwesome5 } from '@expo/vector-icons'

export default function GlucoseRecordDataTableRow(props) {
    const formatDateLabel = (date) => {
        return moment(date).calendar(null, {
            sameDay: '[Hoje] à\\s HH:mm',
            lastDay: '[Ontem] à\\s HH:mm',
            sameElse: 'DD/MM/YYYY HH:mm'
        });
    }

    const data = props.data;

    return (
        <DataTable.Row>
            <DataTable.Cell
                style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={style.dataTableRow}>{data.glr_mg_per_dl}</Text>
            </DataTable.Cell>
            <DataTable.Cell
                style={{ flex: 4, justifyContent: 'center' }}>
                <Text style={style.dataTableRow}>{formatDateLabel(data.glr_created_at)}</Text>
            </DataTable.Cell>
            <DataTable.Cell
                style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={style.dataTableRow}><FontAwesome5 name={'plus'} /></Text>
            </DataTable.Cell>
            <DataTable.Cell
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={data.onDelete}>
                <Text style={{ ...style.dataTableRow }}>
                    <FontAwesome5 name={'trash'}/>
                </Text>
            </DataTable.Cell>
        </DataTable.Row>
    )
}