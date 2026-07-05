let orders = []
let nextId = 1

const getAllOrders = (page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
        totalItems: orders.length,
        totalPages: Math.ceil(orders.length / limit) || 1,
        currentPage: page,
        data: orders.slice(startIndex, endIndex)
    };
}

const getOrderById = (id) => {
    return orders.find(o => o.id === id);
}

const createOrder = (data) => {
    const newOrder = {
        id: nextId++,
        productName: data.productName,
        quantity: data.quantity ?? 1, 
        totalPrice: data.totalPrice ?? 0,
        status: data.status ?? 'pending'
    };
    orders.push(newOrder);
    return newOrder;
}

const updateOrder = (id, data) => {
    const orderIndex = orders.findIndex(o => o.id === id)
    if (orderIndex === -1) return null

    // მხოლოდ დასაშვები ველების განახლება
    const { productName, quantity, totalPrice, status } = data
    
    orders[orderIndex] = {
        ...orders[orderIndex],
        ...(productName && { productName }),
        ...(quantity !== undefined && { quantity }),
        ...(totalPrice !== undefined && { totalPrice }),
        ...(status && { status })
    }

    return orders[orderIndex];
}

const updateOrderStatus = (id, status) => {
    const order = orders.find(o => o.id === id);
    if (!order) return null;

    order.status = status;
    return order;
}

const deleteOrder = (id) => {
    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex === -1) return false;

    orders.splice(orderIndex, 1);
    return true;
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder
}