import React, { useState } from 'react';
import styled from 'styled-components';

interface EmailListProps {
  emailItems: {
    id: number;
    subject: string;
    date: string;
    content: string;
    state: string;
  }[];
}

const EmailList: React.FC<EmailListProps> = ({ emailItems }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleEmailExpansion = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <EmailListWrapper data-cy="email-list">
      {emailItems.map((email) => (
        <EmailItem key={email.id} data-cy="email-item">
          <StateButton state={email.state}>
            {email.state === 'REJECTED' ? '거절' : email.state === 'APPROVED' ? '승인' : '논의'}
          </StateButton>
          <EmailSubject 
          data-cy="email-subject"
          onClick={() => toggleEmailExpansion(email.id)}
          >
            {email.subject}
          </EmailSubject>
          <EmailDate>{email.date}</EmailDate>
          {expandedItems.has(email.id) && <EmailContent data-cy="email-content">{email.content}</EmailContent>}
        </EmailItem>
      ))}
    </EmailListWrapper>
  );
};

const EmailListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 1rem;
  justify-content: space-between;
  position: relative;
`;

const StateButton = styled.div<{ state: string }>`
  cursor: default;
  border: none;
  padding: 0.2rem 0.6rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => getColorByState(props.state)};
  position: absolute;
  right: 10px;
  top: 25px;
  transform: translateY(-50%);
`;

const getColorByState = (state: string) => {
  switch (state) {
    case 'DISCUSSING':
      return 'darkorange';
    case 'APPROVED':
      return 'green';
    case 'REJECTED':
      return 'red';
    default:
      return 'black';
  }
};

const EmailSubject = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding-right: 1rem;
  cursor: pointer;
  width: 30rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    color: darkorange;
  }
`;

const EmailDate = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const EmailContent = styled.div`
  margin: 1.2rem 0 0 0;
  white-space: pre-wrap;
  line-height: 1.3;
`;

export default EmailList;
