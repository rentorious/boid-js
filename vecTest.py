import numpy as np
import matplotlib.pyplot as plt

vecs = np.array([
    # [0, 0],
    [1, 2],
    [5, 8],
    [222, 31],
    [104, 43],
    [0.6, 2.1],
    [.3123, .999]
])

sum_vec = vecs.sum(axis=0)
plt.subplot(211)
plt.plot([0, sum_vec[0]], [0, sum_vec[1]], c="k")

for i in range(len(vecs)):
    plt.subplot(211)
    plt.plot([0, vecs[i, 0]], [0, vecs[i, 1]])

    vecs[i] /= -(vecs[i, 0]**2 + vecs[i, 1]**2 + 1)
    plt.subplot(212)
    plt.plot([0, vecs[i, 0]], [0, vecs[i, 1]])

sum_vec = vecs.sum(axis=0)
plt.subplot(212)
plt.plot([0, sum_vec[0]], [0, sum_vec[1]], c="k")
print(sum_vec)

plt.show()
