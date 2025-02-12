import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarScreen from '@/components/CalendarScreen';

export default function Inputs() {
  const [hours, setHours] = useState('');
  const [cash, setCash] = useState('');
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [entries, setEntries] = useState<Record<string, { hours: string; cash: string }>>({});

  const onDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const saveDate = () => {
    setDate(tempDate);
    setShowDatePicker(false);
  };

  const addEntry = () => {
    const formattedDate = date.toISOString().split('T')[0];
    setEntries((prevEntries) => ({
      ...prevEntries,
      [formattedDate]: { hours, cash },
    }));
    setHours('');
    setCash('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {!showCalendar ? (
          <>
            {/* Top Buttons */}
            <View style={styles.topButtons}>
              <TouchableOpacity onPress={() => console.log('Go Back Pressed')}>
              <Text style={styles.emojiButton}>💵</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowCalendar(true)} disabled={Object.keys(entries).length === 0}>
                <Text style={styles.emojiButton}>📅</Text>
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <Text style={styles.label}>Enter Hours:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 8"
              keyboardType="numeric"
              value={hours}
              onChangeText={setHours}
              returnKeyType="done"
            />

            <Text style={styles.label}>Enter Cash:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 100"
              keyboardType="numeric"
              value={cash}
              onChangeText={setCash}
              returnKeyType="done"
            />

            <Text style={styles.label}>Pick a Date:</Text>
            <Text style={styles.dateText}>Selected Date: {date.toDateString()}</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateButtonText}>📅 Pick a Date</Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <View>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                  onChange={onDateChange}
                />
                <TouchableOpacity style={styles.dateButton} onPress={saveDate}>
                  <Text style={styles.dateButtonText}>Save Date</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Add Workday Button */}
            <TouchableOpacity style={styles.addButton} onPress={addEntry} disabled={!hours || !cash}>
              <Text style={styles.addButtonText}>➕ Add Workday</Text>
            </TouchableOpacity>
          </>
        ) : (
          <CalendarScreen entries={entries} goBack={() => setShowCalendar(false)} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 50,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 500
  },
  emojiButton: {
    fontSize: 30,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 80
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
