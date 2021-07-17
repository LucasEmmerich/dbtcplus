import React from 'react';
import { DataTable,Text } from 'react-native-paper';
import style from './style';

export default function GlucoseRecordDataTableRow(props) {
    const formatDateLabel = (date) => {
        return date;
    }

    const data = props.data;

    return (
        <DataTable.Row key={data.glr_id}>
            <DataTable.Cell
                style={{ flex: 1, justifyContent:'center' }}>
                <Text style={style.dataTableRow}>{data.glr_mg_per_dl}</Text>
            </DataTable.Cell>
            <DataTable.Cell
                style={{ flex: 4, justifyContent:'center' }}>
                <Text style={style.dataTableRow}>{formatDateLabel(data.glr_created_at)}</Text>
            </DataTable.Cell>
            <DataTable.Cell
                style={{ flex: 1, justifyContent:'center' }}
                onPress={data.onDelete}>
                <Text style={style.dataTableRow}>🗑</Text>
            </DataTable.Cell>
            <DataTable.Cell
                style={{ flex: 1, justifyContent:'center' }}>
                <Text style={style.dataTableRow}>🍴</Text>
            </DataTable.Cell>
        </DataTable.Row>
    )
}