package com.shengqitech.ems.system.utils;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

/**
 * @author : wsh
 * @Date : 2023/5/24
 * @Description:
 */
public class TreeBuilderUtils<T> {

    /**
     * 通用的建树方法
     *
     * @param nodes：节点列表，类型为 List<T>。
     * @param parentId：根节点的父节点ID，类型为 int。
     * @param getIdFunction：获取节点ID的函数，类型为 Function<T, Integer>。
     * @param getParentIdFunction：获取节点父节点ID的函数，类型为 Function<T, Integer>。
     * @param getChildrenFunction：获取节点子节点列表的函数，类型为 Function<T, List<T>>。
     * @return 建好的树形结构
     *
     */
    public List<T> buildTree(List<T> nodes, int parentId, Function<T, Integer> getIdFunction, Function<T, Integer> getParentIdFunction, Function<T, List<T>> getChildrenFunction) {
        // 创建一个映射关系，用于将父节点ID与对应的子节点列表关联起来
        Map<Integer, List<T>> nodeMap = new HashMap<>();
        // 存储根节点的列表
        List<T> rootNodes = new ArrayList<>();

        // 构建映射关系和根节点列表
        for (T node : nodes) {
            // 使用 getParentIdFunction 函数获取节点的父节点ID
            int parentNodeId = getParentIdFunction.apply(node);

            // 如果 nodeMap 中不存在该父节点ID的键，则创建一个空的子节点列表，并将其与父节点ID关联起来
            if (!nodeMap.containsKey(parentNodeId)) {
                nodeMap.put(parentNodeId, new ArrayList<>());
            }
            // 将当前节点添加到对应的子节点列表中
            nodeMap.get(parentNodeId).add(node);

            // 如果当前节点的父节点ID与给定的 parentId 相等，则将该节点添加到 rootNodes 中
            if (parentNodeId == parentId) {
                rootNodes.add(node);
            }
        }

        // 将子节点列表设置给各个节点的子节点属性
        for (T node : nodes) {
            // 使用 getIdFunction 函数获取节点的ID
            int nodeId = getIdFunction.apply(node);

            // 如果 nodeMap 中存在该节点ID的键，则获取对应的子节点列表
            if (nodeMap.containsKey(nodeId)) {
                List<T> childNodes = nodeMap.get(nodeId);
                // 使用 getChildrenFunction 函数获取当前节点的子节点列表，并将获取到的子节点列表添加到当前节点的子节点列表中
                getChildrenFunction.apply(node).addAll(childNodes);
            }
        }

        // 返回根节点列表
        return rootNodes;
    }


    /**
     * 获取节点ID的方法，需根据具体场景实现
     *
     * @param node 节点对象
     * @return 节点ID
     */
    private int getNodeId(T node) {
        // 根据具体场景实现获取节点ID的逻辑
        // 返回节点ID的代码示例：return node.getId();
        return 0;
    }

    /**
     * 获取父节点ID的方法，需根据具体场景实现
     *
     * @param node 节点对象
     * @return 父节点ID
     */
    private int getParentNodeId(T node) {
        // 根据具体场景实现获取父节点ID的逻辑
        // 返回父节点ID的代码示例：return node.getParentId();
        return 0;
    }

    /**
     * 设置子节点列表的方法，需根据具体场景实现
     *
     * @param node       节点对象
     * @param childNodes 子节点列表
     */
    private void setChildNodes(T node, List<T> childNodes) {
        // 根据具体场景实现设置子节点列表的逻辑
        // 示例代码：node.setChildren(childNodes);
    }

}
