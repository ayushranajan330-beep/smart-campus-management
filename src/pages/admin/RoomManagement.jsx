import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Loader2, 
  Home, 
  UserPlus, 
  LayoutGrid, 
  List,
  ArrowRight,
  TrendingUp,
  PieChart as PieIcon
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import RoomStats from '../../components/rooms/RoomStats';
import RoomCard from '../../components/rooms/RoomCard';
import RoomAllocationModal from '../../components/rooms/RoomAllocationModal';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlock, setFilterBlock] = useState('All');
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);
  const [allocationLoading, setAllocationLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/rooms');
      setRooms(res.data);
    } catch (error) {
      toast.error('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleAllocate = async (data) => {
    setAllocationLoading(true);
    try {
      await axios.patch(`http://localhost:5001/api/rooms/assign/${data.studentId}`, { roomId: data.roomId });
      toast.success('Room Assigned Successfully');
      setIsAllocationOpen(false);
      fetchRooms();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Allocation failed');
    } finally {
      setAllocationLoading(false);
    }
  };

  const filteredRooms = rooms.filter(r => {
    const matchesSearch = r.roomNumber.includes(searchTerm) || r.block.includes(searchTerm);
    const matchesBlock = filterBlock === 'All' || r.block === filterBlock;
    return matchesSearch && matchesBlock;
  });

  const stats = {
    total: rooms.length,
    occupied: rooms.filter(r => r.status === 'Full').length,
    vacant: rooms.filter(r => r.status === 'Available').length,
    maintenance: rooms.filter(r => r.status === 'Maintenance').length
  };

  const occupancyData = [
    { name: 'Occupied', value: stats.occupied, color: '#8b5cf6' },
    { name: 'Vacant', value: stats.vacant, color: '#10b981' },
    { name: 'Maintenance', value: stats.maintenance, color: '#ef4444' }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Room Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Monitor occupancy and manage room allocations</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => setIsAllocationOpen(true)} className="py-4">
            <UserPlus size={20} className="mr-2" /> Assign Student
          </Button>
          <Button className="py-4 shadow-xl shadow-indigo-500/20">
            <Plus size={20} className="mr-2" /> Add Room
          </Button>
        </div>
      </div>

      {/* Stats & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RoomStats stats={stats} />
          
          <Card className="p-8 border-none shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <LayoutGrid size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Rooms Overview</h3>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl">
                <button 
                  onClick={() => setViewType('grid')}
                  className={`p-2 rounded-xl transition-all ${viewType === 'grid' ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`p-2 rounded-xl transition-all ${viewType === 'list' ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by room number or block..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={filterBlock}
                  onChange={(e) => setFilterBlock(e.target.value)}
                  className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="All">All Blocks</option>
                  <option value="A">A Block</option>
                  <option value="B">B Block</option>
                  <option value="C">C Block</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
                <p className="text-slate-500 font-medium">Fetching rooms...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-8">
          <Card className="p-8 border-none shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Occupancy Rate</h3>
              <div className="flex items-center gap-2 text-green-500 font-bold text-sm bg-green-500/10 px-2 py-1 rounded-lg">
                <TrendingUp size={16} /> 82%
              </div>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h3 className="text-xl font-bold mb-6">Quick Report</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                <span className="text-sm">Available Slots</span>
                <span className="font-black">124</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                <span className="text-sm">Maintenance Logs</span>
                <span className="font-black text-amber-300">08</span>
              </div>
              <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                Export Data <ArrowRight size={16} />
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Allocation Modal */}
      <AnimatePresence>
        {isAllocationOpen && (
          <RoomAllocationModal
            isOpen={isAllocationOpen}
            onClose={() => setIsAllocationOpen(false)}
            onSubmit={handleAllocate}
            isLoading={allocationLoading}
            rooms={rooms}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomManagement;
