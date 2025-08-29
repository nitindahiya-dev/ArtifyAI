import { motion } from "framer-motion";


const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-gray-900 p-6 rounded-xl border border-gray-800"
  >
    <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center mb-4 border border-gray-800">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);


export default FeatureCard;