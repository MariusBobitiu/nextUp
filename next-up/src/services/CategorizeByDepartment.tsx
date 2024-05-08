import { CrewMember, Departments } from '../types/Crew';

const categorizeByDepartment = (crew: CrewMember[]): Departments => {
    return crew.reduce((acc: Departments, member: CrewMember) => {
      const { department } = member;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(member);
      return acc;
    }, {});
};

export default categorizeByDepartment;