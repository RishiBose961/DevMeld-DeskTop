
const RecentActivity = () => {
     const recentActivity = [
    {
      id: '1',
      type: 'submission',
      user: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=face',
      action: 'submitted a solution for',
      target: 'Real-time Chat Component',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'review',
      user: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=face',
      action: 'reviewed and approved',
      target: 'Database Optimization Challenge',
      time: '15 minutes ago',
      status: 'approved'
    },
    {
      id: '3',
      type: 'problem',
      user: 'TechFlow',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      action: 'posted a new problem',
      target: 'Mobile Payment Integration',
      time: '1 hour ago',
      status: 'new'
    },
    {
      id: '4',
      type: 'achievement',
      user: 'Marcus Rodriguez',
      avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=face',
      action: 'earned the',
      target: 'Frontend Master badge',
      time: '3 hours ago',
      status: 'achievement'
    }
  ];
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
     
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                     
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                  
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

  )
}

export default RecentActivity