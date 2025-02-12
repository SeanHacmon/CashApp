import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

interface CalendarProps {
  entries: Record<string, { hours: string; cash: string }>;
  goBack: () => void;
}

export default function CalendarScreen({ entries, goBack }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates = Object.keys(entries).reduce((acc, date) => {
    acc[date] = {
      selected: true,
      marked: true,
      selectedColor: 'blue',
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={goBack}>
        <Text style={styles.emojiButton}>💵</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Calendar</Text>

      <Calendar
        markedDates={markedDates}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
      />

      {selectedDate && entries[selectedDate] ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Details for {selectedDate}</Text>
          <Text style={styles.details}>Hours: {entries[selectedDate].hours}</Text>
          <Text style={styles.details}>Cash: ${entries[selectedDate].cash}</Text>
        </View>
      ) : selectedDate ? (
        <Text style={styles.noData}>No data for {selectedDate}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  emojiButton: {
    fontSize: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  detailsContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginTop: 5,
  },
  noData: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
});
