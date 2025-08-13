import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../style/Category.css';

const serviceDetails = {
  plumber: {
    description: `Plumbers are essential for maintaining and installing piping systems, both in residential and commercial properties.They ensure the smooth flow of water and prevent leakage and contamination. Their responsibilities cover 
    everything from bathroom fittings to outdoor water connections.Plumbers often work with piping materials like PVC, copper, and GI pipes. They are trained to read blueprints and building layouts to position systems accurately. In case 
    of emergencies like pipe bursts or clogs, plumbers act swiftly to minimize damage.Outside labor costs can range from ₹500 to ₹1000 per day 
    depending on the location. On our platform, expert plumbers are available at just ₹300 onwards.We ensure they are background-verified, experienced, and carry the necessary tools. With brands like Finolex and Astral, 
    quality is guaranteed.Book a plumber today and get hassle-free, affordable service at your doorstep.`,
    tools: ['Pipe Wrench', 'PVC Cutter', 'Teflon Tape', 'Plumbing Torch'],
    brands: ['Finolex', 'Astral', 'Supreme'],
  },

  electrician: {
    description: `Electricians play a vital role in safely managing electrical systems in homes, offices, and industries.
They handle wiring, circuit breakers, fuse boxes, and lighting installations with precision and safety. In emergencies like short circuits or power failures,
electricians are equipped to resolve issues quickly. They also ensure proper earthing and voltage regulation. On the field, their toolkit includes testers,
multimeters, and insulated pliers. We partner with brands like Havells, Finolex, and Schneider to ensure safety and quality. Their wages usually range from ₹600 to ₹1200 per day.
Through our platform, you can hire certified electricians starting at ₹400. Whether you're setting up new equipment or repairing existing systems,
our electricians ensure energy efficiency and compliance with safety standards.`,
    tools: ['Multimeter', 'Wire Stripper', 'Tester', 'Insulated Gloves'],
    brands: ['Havells', 'Finolex', 'Schneider'],
  },

  carpenter: {
    description: `Carpenters bring designs to life through woodworking. They specialize in building, repairing, and installing structures like doors, windows, and furniture.
They often work with wood, plywood, laminates, and MDF boards. With the help of tools like chisels and electric drills, they ensure precision and durability in every cut.
Carpenters can create custom furniture that fits your space and aesthetic. Whether it's fixing a creaky cabinet or installing modular kitchen fittings,
their skills are essential. Branded tools from Bosch, Stanley, and Dewalt guarantee both safety and efficiency. Market wages range from ₹600 to ₹1200 per day.
Our platform offers affordable access to skilled carpenters starting at just ₹400. All listed professionals are vetted for experience and craftsmanship.
You can view their profiles, ratings, and previous works before booking.`,
    tools: ['Hammer', 'Measuring Tape', 'Chisel Set', 'Electric Drill'],
    brands: ['Bosch', 'Stanley', 'Dewalt'],
  },

  painter: {
    description: `Painters transform walls and ceilings into beautiful, vibrant spaces. They are skilled in color mixing, surface preparation, and texture application.
Interior and exterior painting require different techniques, and our painters are trained in both. Using rollers, brushes, and spray machines, they deliver smooth finishes.
Putty work, crack filling, and waterproof coatings are part of their expertise. Paints from trusted brands like Asian Paints, Berger, and Nerolac ensure long-lasting shine and protection.
Their average wage in the market is ₹600–₹1000 per day, but our platform offers affordable professionals from ₹350 onward.
Painters also advise clients on color combinations and finishes for walls, ceilings, and woodwork. We provide tools, safety gear, and guarantee cleanup post work.
Whether it’s a single room or an entire house, painters on our platform ensure timely and budget-friendly service.`,
    tools: ['Paint Roller', 'Brush Set', 'Putty Knife', 'Paint Tray'],
    brands: ['Asian Paints', 'Berger', 'Nerolac'],
  },
  cleaner: {
  description: `Cleaning professionals ensure hygienic and organized spaces for homes, offices, and commercial areas.
They are trained in deep cleaning techniques including floor scrubbing, sofa shampooing, and bathroom sanitization.
Using industrial-grade vacuum cleaners, disinfectants, and eco-friendly products, they remove dust, stains, and allergens effectively.
Our cleaners focus on high-touch surfaces and hard-to-reach corners for complete sanitation. Services also include kitchen degreasing, window cleaning, and mattress vacuuming.
We use trusted products from brands like Dettol, Lizol, and 3M for safe and effective results. Market prices vary between ₹500 to ₹1000 depending on area and requirements.
Through our platform, you can access verified cleaners starting from just ₹350. Profiles include ratings, past work images, and customer feedback.
Cleaners come equipped with tools and supplies, ensuring a hassle-free experience and spotless results every time.`,
  tools: ['Vacuum Cleaner', 'Microfiber Cloth', 'Scrubbing Brush', 'Spray Bottle'],
  brands: ['Dettol', 'Lizol', '3M', 'Scotch-Brite'],
},


  gardener: {
    description: `Gardeners bring life to your surroundings by planting, maintaining, and beautifying outdoor and indoor green spaces. They are skilled in landscaping, pruning, soil preparation, and pest control techniques.
Whether it's maintaining a small kitchen garden or designing a lush landscape, our gardeners ensure health and aesthetics. They understand plant nutrition, seasonal care, and watering schedules.
Tasks include lawn mowing, weeding, trimming, composting, and fertilizing. With tools like pruning shears and lawn cutters, they maintain gardens efficiently and safely.
We use eco-friendly practices and recommend organic products for sustainable greenery. Gardeners also install drip irrigation systems and suggest low-maintenance plants for busy clients.
Market wages typically range from ₹500–₹900 per day, but our platform provides quality services starting at just ₹300.
They also offer advice on vertical gardens, balcony setups, and flowering plant arrangements.
With timely service and complete cleanup, our gardeners ensure your green spaces remain vibrant, healthy, and refreshing year-round.`,
    tools: ['Pruning Shears', 'Lawn Mower', 'Hand Trowel', 'Watering Can'],
    brands: ['Fiskars', 'Falcon Tools', 'Wolf-Garten', 'Sharpex'],
  },
};

const typingVariant = (index) => ({
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 2,
      delay: index * 1.5,
    },
  },
});

const Category = () => {
  const { skills } = useParams();
  const skillKey = skills?.toLowerCase();
  const serviceInfo = serviceDetails[skillKey];

  const descriptionLines = serviceInfo?.description.split('\n').filter(Boolean) || [];

  return (
    <div className="category-container">
      <motion.div
        className="category-title-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="category-title">{skills} Service Details</h2>
      </motion.div>

      {serviceInfo ? (
        <motion.div
          className="service-info"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="description-typing">
            {descriptionLines.map((line, index) => (
              <motion.p
                key={index}
                className="animated-line"
                variants={typingVariant(index)}
                initial="hidden"
                animate="visible"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="tools-section"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: descriptionLines.length * 1.5, duration: 0.8 }}
          >
            <h4>Tools Used:</h4>
            <ul>
              {serviceInfo.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="brands-section"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: descriptionLines.length * 1.5 + 0.5, duration: 0.8 }}
          >
            <h4>Popular Brands:</h4>
            <ul>
              {serviceInfo.brands.map((brand, index) => (
                <li key={index}>{brand}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : (
        <p className="no-info">No details available for "{skills}".</p>
      )}
    </div>
  );
};

export default Category;
