import { makeApiCall, paths } from '.';
import { MentorshipRequest, UserRecord } from '../types/models';

export function getAllMentorshipRequests() {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  return makeApiCall<MentorshipRequest[]>(`${paths.MENTORSHIP}/requests`, {
    from: monthAgo,
  });
}

export async function sendStaledRequestEmail(mentorshipId: string) {
  await makeApiCall(
    `${paths.MENTORSHIP}/requests/${mentorshipId}/reminder`,
    null,
    'PUT'
  );
}

export async function sendMentorNotActive(mentorId: string) {
  const response = await makeApiCall<UserRecord>(
    `${paths.ADMIN}/mentor/${mentorId}/notActive`,
    null,
    'PUT'
  );
  if (response?.success) {
    return response.data;
  }
}

export async function freezeMentor(mentorId: string) {
  await makeApiCall(`${paths.ADMIN}/mentor/${mentorId}/freeze`, null, 'PUT');
}

export function getUserRecords(userId: string) {
  return makeApiCall<UserRecord[]>(`${paths.USERS}/${userId}/records`);
}