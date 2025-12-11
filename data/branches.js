// In-memory data store for branches
let branchesData = [
  { id: '1', name: 'Main Branch', location: 'São Paulo', manager: 'João Silva' },
  { id: '2', name: 'North Branch', location: 'Manaus', manager: 'Maria Santos' }
];

let nextId = 3;

const branches = {
  getAll() {
    return branchesData;
  },

  getById(id) {
    return branchesData.find(branch => branch.id === id);
  },

  create(branchData) {
    const newBranch = {
      id: String(nextId++),
      name: branchData.name,
      location: branchData.location,
      manager: branchData.manager || null
    };
    branchesData.push(newBranch);
    return newBranch;
  },

  update(id, branchData) {
    const index = branchesData.findIndex(branch => branch.id === id);
    if (index === -1) {
      return null;
    }
    
    branchesData[index] = {
      ...branchesData[index],
      ...(branchData.name && { name: branchData.name }),
      ...(branchData.location && { location: branchData.location }),
      ...(branchData.manager !== undefined && { manager: branchData.manager })
    };
    
    return branchesData[index];
  },

  remove(id) {
    const index = branchesData.findIndex(branch => branch.id === id);
    if (index === -1) {
      return false;
    }
    
    branchesData.splice(index, 1);
    return true;
  }
};

module.exports = branches;
