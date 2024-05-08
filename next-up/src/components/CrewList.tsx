import React from 'react';
import { CrewMember } from '@/types/Crew';
import categorizeByDepartment from '@/services/CategorizeByDepartment';
import placeholder from '@/assets/userPlaceholder.png';

type CrewListProps = {
  crew: CrewMember[];
}

const CrewList: React.FC<CrewListProps> = ({ crew }) => {
  const departments = categorizeByDepartment(crew);

  return (
    <div className='w-full flex flex-col gap-4 mb-20'>
      {Object.keys(departments).map((department) => (
        <div key={department} className='w-full flex flex-col gap-2'>
          <h2 className='text-xl font-semibold mb-4'>{department}</h2>
          <ul className='flex flex-col items-start gap-4'>
            {departments[department].map((member) => (
              <li key={member.credit_id} className='flex items-center'>
                <img
                  src={member.profile_path != null ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${member.profile_path}` : placeholder}
                  alt={member.name}
                  className='w-20 h-20 rounded-xl object-cover'
                />
                <div className='ml-4'>
                  <h2 className='text-lg font-semibold'>{member.name}</h2>
                  <p className='text-sm'>{member.job}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CrewList;
