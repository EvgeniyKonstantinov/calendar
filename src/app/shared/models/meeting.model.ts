import {MemberModel} from './member.model';

export class MeetingModel {
  id: number;
  day: string;
  members: MemberModel[];
  theme: string;
  timeStart: string;
  timeEnd: string;
}
