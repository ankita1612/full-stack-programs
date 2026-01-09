import mongoose from 'mongoose';

const DummySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  child_data: [
    {
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      }
    }
  ]
});

const Dummy = mongoose.model( 'dummy', DummySchema);
export default Dummy;