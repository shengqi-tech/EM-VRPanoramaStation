package com.shengqitech.wzzconnector.utils;

import com.alibaba.fastjson2.JSONArray;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.QueryApi;
import com.influxdb.client.WriteApi;
import com.influxdb.client.WriteApiBlocking;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import com.influxdb.query.FluxTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Map;


@Component
public class InfluxdbUtil {

    @Autowired
    private InfluxDBClient influxDBClient;


    /**
     * 插入
     *
     * @param measurement
     * @param tags        标签
     * @param fields      字段
     */
    public void insert(String measurement, Map<String, String> tags, Map<String, Object> fields,Long time) {
        WriteApiBlocking writeApiBlocking = influxDBClient.getWriteApiBlocking();
        Point point = Point.measurement(measurement)
                .addTags(tags)
                .addFields(fields)
                .time(time, WritePrecision.MS);
        writeApiBlocking.writePoint(point);
    }

    public void batchInsert(List<Point> points) {
        WriteApi writeApi = influxDBClient.getWriteApi();
        if (points != null && points.size() != 0){
            writeApi.writePoints(points);
        }
        writeApi.close();
    }


}
