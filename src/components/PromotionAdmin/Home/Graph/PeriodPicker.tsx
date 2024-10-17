import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

type Props = {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  startDateChange: (startDate: dayjs.Dayjs | null) => void;
  endDateChange: (endDate: dayjs.Dayjs | null) => void;
};

const PeriodPicker = ({ startDate, endDate, startDateChange, endDateChange }: Props) => {

  return (
    <Container>
      <Wrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MyDatePicker
            slotProps={{
              textField: {
                size: 'small',
                inputProps: {
                  value: startDate ? dayjs(startDate).format('YYYY년 MM월') : '',
                },
              },
            }}
            value={startDate}
            onChange={(newValue: dayjs.Dayjs | null) => {
              startDateChange(newValue);
            }}
            label={'Start Date'}
            views={['year', 'month']}
            openTo='month'
          />
        </LocalizationProvider>
      </Wrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MyDatePicker
          slotProps={{
            textField: {
              size: 'small',
              inputProps: {
                value: endDate ? dayjs(endDate).format('YYYY년 MM월') : '',
              },
            },
          }}
          value={endDate}
          onChange={(newValue: dayjs.Dayjs | null) => {
            endDateChange(newValue);
          }}
          label={'End Date'}
          views={['year', 'month']}
          openTo='month'
        />
      </LocalizationProvider>
    </Container>
  );
};

export default PeriodPicker;

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  margin-right: 7px;
`;
const MyDatePicker = styled(DatePicker)`
  width: 12rem;
  height: 3rem;
  font-size: 1.3rem;
  font-family: 'pretendard-semibold';
  font-weight: bold;
  color: white;
  border: 1px solid;
`;
